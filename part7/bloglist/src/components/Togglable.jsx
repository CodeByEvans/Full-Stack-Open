import { forwardRef, useImperativeHandle, useState } from "react";
import { Button } from "react-bootstrap";

const Togglable = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { diplay: visible ? 'none' : ''}
    const showWhenVisible = { display: visible ? '' : 'none'}

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => ({
        toggleVisibility
    }))

    return (
        <div className="mt-4 mb-4">
            <div style={hideWhenVisible}>
                <Button variant="info" onClick={toggleVisibility}>{props.buttonLabel}</Button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <Button variant="secondary" onClick={toggleVisibility} className="mt-2">cancel</Button>
            </div>
        </div>
    )
})

Togglable.displayName = "Togglable"

export default Togglable