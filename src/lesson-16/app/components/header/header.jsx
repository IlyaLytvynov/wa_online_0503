import * as React from "react/cjs/react.development";

import './header.scss';

export class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      isActive: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
   this.setState((state) => {
     state.isActive = !state.isActive;
     return state;
   })
  }

  render() {
    const componentClasses = `header ${this.state.isActive ? 'header_active': ''}`;

    return <header className={componentClasses} onClick={this.toggle}>
      <div className="header__content">
        <h2>Hello world</h2>
      </div>
    </header>;
  }
}