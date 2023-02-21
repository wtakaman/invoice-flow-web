import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';

function Header() {
  return (
    <Menu style={{ marginTop: 10, height:100}}>
      <Link route="/">
        <a className="item">
          InvoiceFlow
        </a>
      </Link>
    </Menu>
  );
}
export default Header;
