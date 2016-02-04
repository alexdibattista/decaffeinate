import NodePatcher from './NodePatcher';

export default class AssignOpPatcher extends NodePatcher {
  constructor(node, context, editor, assignee, expression) {
    super(node, context, editor);
    this.assignee = assignee;
    this.expression = expression;
  }

  patch() {
    let { assignee, expression } = this;
    assignee.patch();
    expression.patch();
  }
}