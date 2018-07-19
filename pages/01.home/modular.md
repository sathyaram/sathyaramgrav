---
title: Modular
content:
  items: '@self.modular'
  order:
    by: default
    dir: asc
form:
  name: contact
  fields:
    -
      name: name
      label: Name
      placeholder: 'Enter your name'
      type: text
      validate:
      required: true
    -
      name: email
      label: Email
      placeholder: 'Enter your email address'
      type: email
      validate:
      required: true
    -
      name: message
      label: Message
      placeholder: 'Enter your message'
      type: textarea
      validate:
      required: true
  buttons:
    -
      type: submit
      value: Send
  process:
    -
      email:
        from: '{{ form.value.email|e }}'
        to: '{{ config.plugins.email.to }}'
        reply_to: '{{ form.value.email }}'
        subject: 'web design for - {{ form.value.name|e }} '
        body: '{% include ''forms/data.html.twig'' %}'
    -
      save:
        fileprefix: contact-
        dateformat: Ymd-His-u
        extension: txt
        body: '{% include ''forms/data.txt.twig'' %}'
    -
      message: 'Thank you for getting in touch!'
    -
      display: thankyou
---

