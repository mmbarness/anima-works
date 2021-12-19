import '../styles/contact.scss'
import emailjs from 'emailjs-com'
//p sure emailjs lacks typings, so this file is jsx

export const Contact = () => {

    const sendEmail = async (e) => {
        e.preventDefault();
        const sendBtn = document.getElementById('contact-submit-btn')
        emailjs.sendForm('service_sjnz7oq', 'template_6dj2gbm', e.target, 'user_qq0BsoTqEV0SBv3Iw0Lvk')
            .then((result) => {
                
            }, (error) => {
                
        });
        sendBtn.value = "Sending..."
        await new Promise(r => setTimeout(r, 1000));
        sendBtn.value = "Sent!"
        await new Promise(r => setTimeout(r, 250));
        sendBtn.disabled = true
        sendBtn.style.backgroundColor = "grey"
        sendBtn.style.pointerEvents = "none"
        // sendBtn.value = "Send"
    }

    return(
        <div id="contact-container">
            <form className="contact-form" onSubmit={ (e) => sendEmail(e)}>
                <input type="hidden" name="contact_number" />
                <label>Name</label>
                <input type="text" name="user_name" />
                <label>Email</label>
                <input type="email" name="user_email" />
                <label>Message</label>
                <textarea name="message" />
                <input type="submit" value="Send" id="contact-submit-btn"/>
            </form>
        </div>
    )

}