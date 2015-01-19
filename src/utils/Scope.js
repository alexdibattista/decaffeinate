import leftHandIdentifiers from './leftHandIdentifiers';

/**
 * Represents a CoffeeScript scope and its bindings.
 *
 * @param {?Scope} parent
 * @constructor
 */
export default class Scope {
  constructor(parent) {
    this.bindings = Object.create(parent ? parent.bindings : null);
  }

  /**
   * @param {string} name
   * @returns {?Object}
   */
  getBinding(name) {
    return this.bindings[this.key(name)] || null;
  }

  /**
   * @param {string} name
   * @param {Object} node
   */
  declares(name, node) {
    const key = this.key(name);
    this.bindings[key] = node;
  }

  /**
   * @param {string} name
   * @param {Object} node
   */
  assigns(name, node) {
    if (!this.bindings[this.key(name)]) {
      // Not defined in this or any parent scope.
      this.declares(name, node);
    }
  }

  /**
   * @param {string} name
   * @returns {string}
   * @private
   */
  key(name) {
    return '$' + name;
  }

  /**
   * Handles declarations or assigns for any bindings for a given node.
   *
   * @param {Object} node
   */
  processNode(node) {
    if (node.type === 'AssignOp') {
      leftHandIdentifiers(node.assignee).forEach(identifier =>
        this.assigns(identifier.data, identifier)
      );
    }

    if (node.type === 'Function') {
      node.parameters.forEach(parameter =>
        this.declares(parameter.data, parameter)
      );
    }
  }
}
