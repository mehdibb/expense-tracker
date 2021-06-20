import {StyledComponent} from '@emotion/styled';
import {observer} from 'mobx-react-lite';
import React from 'react';


function originalMemo<P extends object, TRef = unknown>(
  Component: React.ForwardRefRenderFunction<TRef, P>,
  forwardRef: boolean,
): React.ForwardRefExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<TRef>>;

function originalMemo<P extends object, TRef = unknown>(
  Component: React.ForwardRefRenderFunction<TRef, P>,
): React.FunctionComponent<P>;

function originalMemo<P extends object, TRef = unknown>(
  Component: React.ForwardRefRenderFunction<TRef, P>,
  forwardRef = false,
):
  | React.ForwardRefExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<TRef>>
  | React.FunctionComponent<P> {
  if (forwardRef) {
    const ObserverComponent = observer(Component, {forwardRef: true});

    function Component_(props: any, ref: React.Ref<TRef>): React.ReactElement {
      return <ObserverComponent ref={ref} {...props} />;
    }

    return React.forwardRef(Component_);
  }
  else {
    const ObserverComponent = observer(Component);

    return ObserverComponent;
  }
}

function styledMemo<T>(component: T): T;
function styledMemo<T, U>(component: T, styledComponent: StyledComponent<U>): T & StyledComponent<U>;
function styledMemo<T>(component: T, forwardRef: true): T;
function styledMemo<T, U>(component: T, styledComponent: StyledComponent<U>, forwardRef: true): T & StyledComponent<U>;

function styledMemo<T, U>(
  component: T,
  styledComponent?: StyledComponent<U> | boolean,
  forwardRef = false,
): T | T & StyledComponent<U> {
  const typedMemo: <V>(component: V, forwardRef: boolean) => V = originalMemo;

  if (styledComponent == null) {
    return typedMemo(component, forwardRef);
  }
  else if (typeof styledComponent === 'boolean') {
    return typedMemo(component, styledComponent);
  }
  else {
    const typedWithComponent: <V>(component: V) =>
    V & StyledComponent<U> = styledComponent.withComponent;

    return typedWithComponent(typedMemo(component, forwardRef));
  }
}

export const memo = styledMemo;
export default styledMemo;
