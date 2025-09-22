import {useEffect, useState} from 'react';
import {MathJaxContext} from 'better-react-mathjax';
import {Spin} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';

export default function MathJaxWrapper({children, ...props}) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (window['MathJax']) {
        setIsReady(true);
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);


  return (
    <MathJaxContext {...props}>
      {!isReady && <Spin indicator={<LoadingOutlined spin />} spinning={!isReady}></Spin>}
      {isReady && children}
    </MathJaxContext>);
}
