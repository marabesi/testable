import {vitest} from 'vitest';

require('isomorphic-fetch');

import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });

vitest.mock('codemirror/lib/codemirror.css');
