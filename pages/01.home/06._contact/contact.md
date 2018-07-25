---
title: 'Contact'
form:
  name: 'contact-form'
  fields:
    -
      type: 'text'
      name: 'name'
      label: 'Name'
      placeholder: 'Enter your name'
      autofocus: 'on'
      autocomplete: 'off'
      validate:
        required: true
    -
      type: 'email'
      name: 'email'
      label: 'Email'
      placeholder: 'Enter your email address'
      autocomplete: 'off'
      validate:
        required: true
    -
      type: 'textarea'
      name: 'message'
      label: 'Message'
      placeholder: 'Enter your message'
      autocomplete: 'off'
      validate:
        required: true
  buttons:
    -
      type: 'submit'
      value: 'Send'
  process:
    -
      email:
        to: 'lukesims52@gmail.com'
        from: '{{ form.value.email }}'
        reply_to: '{{ form.value.email }}'
        subject: 'SathyaRam.com Contact Form - {{ form.value.name }}'
        body: '{% include ''forms/emails/contact.html.twig'' %}'
    -
      save:
        fileprefix: 'contact-'
        dateformat: 'Ymd-His-u'
        extension: 'txt'
        body: '{% include ''forms/logs/contact.html.twig'' %}'
    -
      message: 'Thank you for getting in touch!'
    -
      display: thankyou
---
