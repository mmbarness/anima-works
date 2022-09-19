import '../styles/contact.scss'
import emailjs from 'emailjs-com'
import { useRef, useState } from 'react'
import { match, P } from 'ts-pattern';
//p sure emailjs lacks typings, so this file is jsx

export const Contact = () => {

    const form = useRef(); 

    const [ contactForm, setContactForm ] = useState({
        name: null,
        email: null,
        message: null,
    });

    const sendEmail = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        match(contactForm)
            .with({
                name: P.string,
                email: P.string,
                message: P.string,
            }, async (validFormInputs) => {      
                const sendBtn = document.getElementById('contact-submit-btn') as HTMLButtonElement
                try {
                    sendBtn.value = "Sending..."
                    await emailjs.sendForm('service_sjnz7oq', 'template_6dj2gbm', form.current, 'user_qq0BsoTqEV0SBv3Iw0Lvk')
                } catch(e) {
                    console.log({e})
                }
                await new Promise(r => setTimeout(r, 1000));
                sendBtn.value = "Sent!"
                await new Promise(r => setTimeout(r, 250));
                sendBtn.disabled = true
                sendBtn.style.pointerEvents = "none"
            })
            .with(P._, () => {
                console.log('try filling in the form how about')
            })
            .run()
    }

    return(
        <div id="contact-container">
            <form ref={form} className="contact-form" onSubmit={ (e) => sendEmail(e)} >
                <input type="hidden" name="contact_number"/>
                <label>Name</label>
                <input type="text" name="user_name" onChange={e => setContactForm({...contactForm, name: e.target.value})}/>
                <label>Email</label>
                <input type="email" name="user_email" onChange={e => setContactForm({...contactForm, email: e.target.value})}/>
                <label>Message</label>
                <textarea name="message" onChange={e => setContactForm({...contactForm, message: e.target.value})}/>
                <input type="submit" value="Send" id="contact-submit-btn"/>
            </form>
        </div>
    )

}