// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0;

import { ISwapRequester } from './ISwapManager.sol';

import { Enum } from '@safe/common/Enum.sol';
import { GnosisSafe } from '@safe/GnosisSafe.sol';
import { IERC20 } from './IERC20.sol';

contract SafeManager is ISwapManager {
  /// @notice The Gnosis Safe that this module is attached to.
  GnosisSafe public immutable safe;

  /// @dev An array is used as the data structure (over a mapping) because Searchers
  ///     need to be able to iterate over all swap requests efficently.
  SwapRequest[] public swapRequests;
  int64[] public poolSplit;
  address[] public poolTokens;
  int32 decimalPlaces = 1000;

  constructor(address payable _safeAddr) {
    safe = GnosisSafe(_safeAddr);
  }

  function setPoolParams(
    int64[] memory _poolSplit,
    address[] memory _poolTokens
  ) external {
    require(
      msg.sender == address(safe),
      'Only the Safe may set pool parameters'
    );
    require(
      _poolSplit.length == _poolTokens.length,
      'Pool split and pool tokens must be the same length'
    );

    poolSplit = _poolSplit;
    poolTokens = _poolTokens;
  }

  function createSwapRequest(
    SwapRequest memory _swap
  ) external override returns (uint256 id_) {
    require(
      msg.sender == address(safe),
      'Only the Safe may create swap requests'
    );

    swapRequests.push(_swap);
    id_ = swapRequests.length;

    emit SwapRequestCreated(id_, address(safe), _swap);
  }

  function cancelSwapRequest(uint256 _id) external override {
    require(
      msg.sender == address(safe),
      'Only the Safe may cancel swap requests'
    );

    SwapRequest storage swap = swapRequests[_id];
    swap.cancelled = true;

    emit SwapRequestCancelled(_id, address(safe), swap);
  }

  /// @notice Executes a swap request, transferring tokens from the source to the
  ///     recipient. The source MUST approve the swap.ToToken for swap.ToAmount
  ///     to the Safe before calling this function.
  function executeSwapRequest(
    uint256 _id,
    address _source,
    address _recipient
  ) external override {
    SwapRequest storage swap = swapRequests[_id];
    require(
      swap.deadline == 0 || swap.deadline >= block.timestamp,
      'Swap request has expired'
    );
    require(!swap.cancelled, 'Swap request has already been cancelled');
    require(!swap.executed, 'Swap request has already been executed');
    swap.executed = true;

    // transfer tokens from source to safe
    bytes memory transferToSafeTx = abi.encodeWithSelector(
      IERC20.transferFrom.selector,
      _source,
      address(safe),
      swap.toAmount
    );
    require(
      safe.execTransactionFromModule(
        address(swap.toToken),
        0,
        transferToSafeTx,
        Enum.Operation.Call
      ),
      'token transfer to safe failed'
    );

    // transfer tokens from safe to recipient
    bytes memory transferToRecipientTx = abi.encodeWithSelector(
      IERC20.transfer.selector,
      _recipient,
      swap.fromAmount
    );
    require(
      safe.execTransactionFromModule(
        address(swap.fromToken),
        0,
        transferToRecipientTx,
        Enum.Operation.Call
      ),
      'token transfer to recipient failed'
    );

    emit SwapRequestExecuted(_id, address(safe), _source, _recipient, swap);
  }

  function getAllSwapRequests() external view returns (SwapRequest[] memory) {
    return swapRequests;
  }

  function allSwapRequestsLength() external view returns (uint256) {
    return swapRequests.length;
  }
}
