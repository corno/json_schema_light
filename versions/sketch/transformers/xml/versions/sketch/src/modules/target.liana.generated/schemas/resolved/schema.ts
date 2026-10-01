import * as p_ from 'pareto-core/schema'

// types

namespace Document_ {
    
    export type doc_type = string
    
    export type root = Element_
}

type Document_ = {
    readonly 'doc type': Document_.doc_type
    readonly 'root': Document_.root
}

type Root_ = Document_

namespace Element_ {
    
    export type name = Qualified_Name_
    
    export namespace attributes {
        
        export namespace L {
            
            export type name = Qualified_Name_
            
            export type value = string
        }
        
        export type L = {
            readonly 'name': L.name
            readonly 'value': L.value
        }
    }
    
    export type attributes = p_.List<
        attributes.L
    >
    
    export namespace content_type {
        
        export type empty = null
        
        export namespace text_only {
            
            export type value = string
        }
        
        export type text_only = {
            readonly 'value': text_only.value
        }
        
        export type mixed = Mixed_Content_
        
        export namespace nodes_only {
            
            export namespace children {
                
                export type L = Node_
            }
            
            export type children = p_.List<
                children.L
            >
        }
        
        export type nodes_only = {
            readonly 'children': nodes_only.children
        }
    }
    
    export type content_type = 
        | readonly ['empty', content_type.empty]
        | readonly ['text only', content_type.text_only]
        | readonly ['mixed', content_type.mixed]
        | readonly ['nodes only', content_type.nodes_only]
}

type Element_ = {
    readonly 'name': Element_.name
    readonly 'attributes': Element_.attributes
    readonly 'content type': Element_.content_type
}

namespace Mixed_Content_ {
    
    export namespace L {
        
        export type node = Node_
        
        export namespace text {
            
            export type value = string
        }
        
        export type text = {
            readonly 'value': text.value
        }
    }
    
    export type L = 
        | readonly ['node', L.node]
        | readonly ['text', L.text]
}

type Mixed_Content_ = p_.List<
    Mixed_Content_.L
>

namespace Node_ {
    
    export type element = Element_
    
    export type comment = string
    
    export type cdata = string
    
    export namespace processing_instruction {
        
        export type target = string
        
        export type data = string
    }
    
    export type processing_instruction = {
        readonly 'target': processing_instruction.target
        readonly 'data': processing_instruction.data
    }
}

type Node_ = 
    | readonly ['element', Node_.element]
    | readonly ['comment', Node_.comment]
    | readonly ['cdata', Node_.cdata]
    | readonly ['processing instruction', Node_.processing_instruction]

namespace Qualified_Name_ {
    
    export namespace namespace_prefix {
        
        export type O = string
    }
    
    export type namespace_prefix = p_.Optional_Value<
        namespace_prefix.O
    >
    
    export type local_name = string
}

type Qualified_Name_ = {
    readonly 'namespace prefix': Qualified_Name_.namespace_prefix
    readonly 'local name': Qualified_Name_.local_name
}

// exported root types
export { 
    type Document_ as Document, 
    type Root_ as Root, 
    type Element_ as Element, 
    type Mixed_Content_ as Mixed_Content, 
    type Node_ as Node, 
    type Qualified_Name_ as Qualified_Name, 
}
