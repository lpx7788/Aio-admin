import React, { Component } from "react";

// 按需加载组件
export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      const { default: component } = await importComponent();

      this.setState({
        component: component
      });
    }

    render() {
      const comp = this.state.component;
      return comp ? <comp {...this.props} /> : null;
    }
  }

  return AsyncComponent;
}