import 'bootstrap/dist/css/bootstrap.css';
import '../CssStyling/Authentication.css';

export default function Input({ label, id, value, onChange, ...props }) {
    return (
        <p className="control">
            <label htmlFor={id}>{label}</label>
            <input 
                id={id} 
                name={id} 
                value={value} 
                onChange={onChange} 
                className="form-control" 
                {...props} 
            />
        </p>
    );
}
