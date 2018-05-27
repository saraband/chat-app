import React from 'react'

export default ({src, ...props}) => (
  <div dangerouslySetInnerHTML={{__html: src}} {...props} ></div>
)