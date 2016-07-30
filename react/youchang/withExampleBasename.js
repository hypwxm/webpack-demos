import useBasename from 'history'

// This helper is for setting basename on examples with minimal boilerplate. In
// an actual application, you would build a custom history to set basename.
//添加根路径
export default function withExampleBasename(history, dirname) {
  return useBasename(() => history)({ basename: `/${dirname}` })
}
