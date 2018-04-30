import * as React from "react/cjs/react.development";
import { TaskList } from '../task-list/task-list.jsx';

import './content.styles.scss';

export class Content extends React.Component {
  render() {
    return <main className="app-content">
      <div className="app-content__content">
        <TaskList />
      </div>
    </main>
  }
}