// BeispielComponent.js

import React from 'react';
import SwaggerUIReact from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUIComponent = () => {
  return <SwaggerUIReact url="/path/to/your/swagger.json" />;
};

export default SwaggerUIComponent;
