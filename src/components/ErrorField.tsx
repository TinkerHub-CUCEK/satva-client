const ErrorField = ({errorText}: {errorText: string}) => {
  if (errorText == '') {
    return null;
  }
  return <div className="error">{errorText}</div>;
};

export default ErrorField;
