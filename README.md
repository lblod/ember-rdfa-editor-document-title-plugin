ember-rdfa-editor-document-title-plugin
==============================================================================

A plugin to extract title from rdfa-editor-document

Installation
------------------------------------------------------------------------------

```
ember install @lblod/ember-rdfa-editor-document-title-plugin
```


Usage
------------------------------------------------------------------------------

Current implementation just checks for a Zitting with dct:Title.
Then sets property 'title' in the service rdfa-editor-document-title-plugin.
Use an observer on this property to track changes.


Contributing
------------------------------------------------------------------------------

### Installation

* `git clone https://github.com/lblod/ember-rdfa-editor-document-title-plugin.git`
* `cd ember-rdfa-editor-document-title-plugin`
* `npm install`

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
