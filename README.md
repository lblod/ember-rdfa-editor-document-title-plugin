ember-rdfa-editor-document-title-plugin
==============================================================================

A plugin to extract title from rdfa-editor-document


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.4 or above
* Ember CLI v2.13 or above
* Node.js v8 or above


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

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
