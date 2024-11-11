import '../CssStyling/Alert.css';

export const showAlert = (type, msg) => {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert--${type}`;
    alertDiv.textContent = msg;

    document.body.appendChild(alertDiv);

    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
};
