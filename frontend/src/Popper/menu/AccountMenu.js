import Tippy from "@tippyjs/react/headless";
import Wrapper from "../Wrapper";
import MenuItem from "./MenuItem";
import React from "react";

function AccountMenu({ children, items = [] }) {
  const renderItem = () => {
    return items.map((item, index) => <MenuItem key={index} data={item} />);
  };
  return (
    <Tippy
      interactive
      placement="bottom-end"
      render={(attrs) => (
        <div className="w-[200px]" tabIndex={-1} {...attrs}>
          <Wrapper>{renderItem()}</Wrapper>
        </div>
      )}
    >
      {children}
    </Tippy>
  );
}
export default AccountMenu;
