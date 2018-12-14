import './stylesheets/main.scss';

async function foo() {
  console.log('async working!');
}

async function bar() {
  await foo();
  console.log('after foo');
}

bar();
