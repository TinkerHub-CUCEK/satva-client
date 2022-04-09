const ErrorField = ({errorText}: {errorText: string}) => {
  if (errorText == '') {
    return null;
  }
  return <div className="error text-red-700 font-medium">{errorText}</div>;
};

export default ErrorField;
