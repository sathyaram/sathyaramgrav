---
title: 'Contact'
cache_enable: false
form:
  name: 'contact-form'
  action: '/#contact'
  template: form-messages
  refresh_prevention: true
  method: 'POST'
  fields:
    -
      type: 'text'
      name: 'name'
      label: 'Name'
      placeholder: 'Enter your name'
      autocomplete: 'off'
      autocorrect: 'off'
      spellcheck: 'off'
      validate:
        required: true
    -
      type: 'email'
      name: 'email'
      label: 'Email'
      placeholder: 'Enter your email address'
      autocomplete: 'off'
      autocorrect: 'off'
      spellcheck: 'off'
      validate:
        required: true
    -
      type: 'textarea'
      name: 'message'
      label: 'Message'
      placeholder: 'Enter your message'
      autocomplete: 'off'
      autocorrect: 'off'
      validate:
        required: true
  buttons:
    submit:
      type: 'submit'
      value: 'Send'
  process:
    email:
      to: '{{ config.env.contact_form_email }}'
      from: '{{ form.value.email|e }}'
      reply_to: '{{ form.value.email|e }}'
      subject: 'SathyaRam.com Contact Form - {{ form.value.name|e }}'
      body: '{% include ''forms/data.html.twig'' %}'
    save:
      fileprefix: 'contact-form--'
      dateformat: 'Ymd-His-u'
      extension: 'txt'
      body: '{% include ''forms/data.txt.twig'' %}'
    message: 'Thank you for getting in touch!'
    reset: true
---
