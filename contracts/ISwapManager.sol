// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0;

interface ISwapManager {
  /// @param fromToken The token the Safe holds.
  /// @param toToken The token the Safe recieves.
  /// @param fromAmount The amount of fromToken the Safe holds.
  /// @param toAmount The amount of toToken the Safe recieves.
  /// @param deadline The time at which this SwapRequest expires. 0 means no deadline.
  /// @param cancelled Has this SwapRequest been cancelled, preventing execution.
  /// @param executed Has this SwapRequest been executed, preventing execution.
  struct SwapRequest {
    bool cancelled;
    bool executed;
    address fromToken;
    address toToken;
    uint256 fromAmount;
    uint256 toAmount;
    uint256 deadline;
  }

  event SwapRequestCreated(
    uint256 indexed id,
    address indexed requester,
    SwapRequest swap
  );
  event SwapRequestCancelled(
    uint256 indexed id,
    address indexed requester,
    SwapRequest swap
  );
  event SwapRequestExecuted(
    uint256 indexed id,
    address indexed requester,
    address source,
    address recipient,
    SwapRequest swap
  );

  function createSwapRequest(
    SwapRequest memory swap
  ) external returns (uint256 id);

  function cancelSwapRequest(uint256 id) external;

  function executeSwapRequest(
    uint256 id,
    address source,
    address recipient
  ) external;

  function getAllSwapRequests() external view returns (SwapRequest[] memory);

  function allSwapRequestsLength() external view returns (uint256);
}
