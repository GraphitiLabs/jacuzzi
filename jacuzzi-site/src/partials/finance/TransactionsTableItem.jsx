import React from 'react';

function TransactionsTableItem(props) {
  const statusColor = status => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-100 text-emerald-600';
      case 'Canceled':
        return 'bg-rose-100 text-rose-500';
      default:
        return 'bg-slate-100 text-slate-500';
    }
  };

  const amountColor = amount => {
    switch (amount.charAt(0)) {
      case '+':
        return 'text-emerald-500';
      default:
        return 'text-slate-700';
    }
  };

  return (
    <tr>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        <div className="flex items-center">
          <label className="inline-flex">
            <span className="sr-only">Select</span>
            <input
              id={props.id}
              className="form-textarea"
              type="text"
              placeholder="% Allocation"
              onChange={props.handleClick}
              checked={props.isChecked}
            />
          </label>
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap ">
        <div className="flex items-center">
          <div className="w-9 h-9 shrink-0 mr-2 sm:mr-3">
            <select className='form-input pr-9 focus:border-slate-300' name="Token" id="">
              <option value="a">USDC</option>
              <option value="b">USDT</option>
              <option value="c">MATIC</option>
              <option value="d">ETH</option>
              <option value="e">UNI</option>
              <option value="f">SUSHI</option>
              <option value="g">LINK</option>
            </select>
        </div>
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        <div className="flex items-center">
          <label className="inline-flex">
            <span className="sr-only">Select</span>
            <input
              id={props.id}
              className="form-textarea"
              type="text"
              placeholder="Initial Token Deposit"
              onChange={props.handleClick}
              checked={props.isChecked}
            />
          </label>
        </div>
      </td>
    </tr>
  );
}

export default TransactionsTableItem;
