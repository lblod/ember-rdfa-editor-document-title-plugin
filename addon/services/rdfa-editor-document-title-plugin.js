import Service from '@ember/service';
import { task } from 'ember-concurrency';

/**
 * Service responsible for extracting a title from notulen.
 * ---------------------------------------------------
 * CODE REVIEW NOTES
 * ---------------------------------------------------
 *
 *  INTERACTION PATTERNS
 *  --------------------
 *  For all incoming contexts, looks for a couple of properties in the document, which can be ok to create a title from.
 *  See implementation for the exact properties, but these are really tighlty coupled with how document in gelinkt-notuleren editor.
 *  If encountered, the title is built, a title property is set in the service which is exposed to potential consumers.
 *
 *  POTENTIAL ISSUES/TODO
 *  ---------------------
 *   - Heavely dependepent on the structure of a template in gelinkt-notuleren. Not entirely sure how big of a problem this is.
 *
 * ---------------------------------------------------
 * END CODE REVIEW NOTES
 * ---------------------------------------------------
 * @module editor-document-title-plugin
 * @class RdfaEditorDocumentTitlePlugin
 * @constructor
 * @extends EmberService
 */
const RdfaEditorDocumentTitlePlugin = Service.extend({

  title: '',

  init(){
    this._super(...arguments);
  },

  /**
   * Restartable task to handle the incoming events from the editor dispatcher
   *
   * @method execute
   *
   * @param {string} hrId Unique identifier of the event in the hintsRegistry
   * @param {Array} contexts RDFa contexts of the text snippets the event applies on
   * @param {Object} hintsRegistry Registry of hints in the editor
   * @param {Object} editor The RDFa editor instance
   *
   * @public
   */
  execute: task(function * (hrId, contexts) {
    if (contexts.length === 0) return [];
    contexts.forEach((context) => {
      let relevantContext = this.detectRelevantContext(context);
      if (relevantContext)
        this.set('title', this.generateTitle(relevantContext));
    });
  }),

  /**
   * Given context object, tries to detect a context the plugin can work on
   *
   * @method detectRelevantContext
   *
   * @param {Object} context Text snippet at a specific location with an RDFa context
   *
   * @return {Object} context if found, else undefined
   *
   * @private
   */
  detectRelevantContext(contexts){
    //we want a title of a zitting
    if(!contexts.context.some(this.isAZitting))
      return;

    let zittingUri = contexts.context.find(this.isAZitting).subject;

    if(contexts.context.some(triple => this.subjectHasDcTermsTitlePredicate(zittingUri, triple)))
      return contexts;

  },

  subjectHasDcTermsTitlePredicate(subjectUri, triple){
    return triple.predicate === 'http://purl.org/dc/terms/title' && triple.subject === subjectUri;
  },

  isAZitting(triple){
    return triple.object === 'http://data.vlaanderen.be/ns/besluit#Zitting';
  },

  subjectHasGeplandeStart(subjectUri, triple){
    return triple.predicate === 'http://data.vlaanderen.be/ns/besluit#geplandeStart' && triple.subject === subjectUri;
  },

  generateTitle(contexts){
    let title = contexts.context.find(t => t.predicate === 'http://purl.org/dc/terms/title').object;
    title = title.replace(/\s\s+/g, ' ');
    title = title.replace( /\u200B/, '');
    return title;
  }

});

RdfaEditorDocumentTitlePlugin.reopen({
  who: 'editor-plugins/document-title-card'
});
export default RdfaEditorDocumentTitlePlugin;
