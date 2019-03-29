import { createElement, render } from 'rax';
import * as  DomDriver from 'driver-dom';
import RaxTextInput from '../../src';

render(<RaxTextInput />, document.body, { driver: DomDriver });
