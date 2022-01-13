import {greet} from './greet';

greet();
greet('John');
greet(...['John', 'Jane']);
setTimeout(greet, 10, 'John', 'Jane');
