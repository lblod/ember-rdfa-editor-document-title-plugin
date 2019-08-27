ember-rdfa-editor-document-title-plugin
==============================================================================

A plugin to extract title from rdfa-editor-document.


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
From a predefined type, look for the scanned resource of this type with attribute `property=http://purl.org/dc/terms/title`.
The value of this predicate will be extracted and stored in the `title` property of service rdfa-editor-document-title-plugin.
The last encounter of this property will be taken into account.
This value can be used by the client elsewhere in the application, like:

```
import { computed } from '@ember/object';

export default Component.extend({
  titlePlugin: service('rdfa-editor-document-title-plugin'),

  extractedTitle: computed('titlePlugin.title', function(){
    return this.titlePlugin.get('title');
  })
})
```

Caveats
------------------------------------------------------------------------------
Current implementation just checks for a resource with `rdfs:type` `http://data.vlaanderen.be/ns/besluit#Zitting` with attribute `dct:title`.


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
