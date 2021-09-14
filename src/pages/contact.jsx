import '../styles/contact.scss'
import emailjs from 'emailjs-com'
//p sure emailjs lacks typings, so this file is jsx

export const contact = () => {

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('service_sjnz7oq', 'template_6dj2gbm', e.target, 'user_qq0BsoTqEV0SBv3Iw0Lvk')
            .then((result) => {
                
            }, (error) => {
                
        });
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