export const addErrorListener = ({ response }, next) => {
  if (response.ok) {
    response.clone().json().then(({ errors }) => {
      if (errors) {
        console.log('GraphQL Errors:', errors.map((e) => e.message));

              // ToastUtils.showToastError(global[GlobalKeys.THIS_TOAST], errors[0].message);
      }
      next();
    });
  } else {
    response.clone().text().then((bodyText) => {
      console.warn(`Network Error: ${response.status} (${response.statusText}) - ${bodyText}`);
      next();
    });
  }
};
