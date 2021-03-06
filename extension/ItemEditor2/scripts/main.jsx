import React from 'react';
import ReactDOM from 'react-dom';
import {MuiThemeProvider} from 'material-ui';
import Menubar from '../views/Menubar';
import PathSelector from '../views/PathSelector';
import injectTapEventPlugin from 'react-tap-event-plugin';

import {dialog} from 'electron';
import FileList from "../views/FileList";

import GlobalSnack from "../views/GlobalSnack"
import Editors from "../views/Editors";
import Confirm from "../views/overwrite-material-ui/Confirm";
injectTapEventPlugin();

window.E = {
	/**Window.E.confirm("询问", "确定要删除么") or Window.E.confirm("确定要删除么")*/
	confirm: (msg, callback) => {
		ReactDOM.render(<Confirm msg={msg} callback={callback}/>, document.getElementById("dialog"));
	}
};

//路径不存在，主动选择
if (!window.localStorage.getItem("path")) {
	ReactDOM.render(<PathSelector callback={load}/>, document.getElementById("dialog"));
} else {
	load();
}


function load() {
	const App = () => (
		<MuiThemeProvider>
			<div>
				<Menubar />
				<div className="container">
					<div className="file-list">
						<FileList/>
					</div>
					<div className="editor-outer">
						<Editors/>
					</div>
				</div>
				<GlobalSnack/>
			</div>
		</MuiThemeProvider>
	);

	ReactDOM.render(<App />, document.getElementById("app"));
}

window.document.body.oncontextmenu = e => {
	let event = document.createEvent('Events');
	event.initEvent("click", true, false);

	window.document.body.dispatchEvent(event)
};
