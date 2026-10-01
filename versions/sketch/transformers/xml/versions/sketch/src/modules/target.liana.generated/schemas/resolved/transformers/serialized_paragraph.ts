import * as p_ from 'pareto-core/transformer'

// schemas
import * as s_source from "../schema.js"
import * as s_target from "pareto-fountain-pen/modules/paragraph/schemas/serialized/schema"
import * as s_parameters from "pareto-fountain-pen/modules/paragraph/schemas/paragraph_serialization/schema"

// transformer dependencies
import * as t_to_sealed_target from "./astn_sealed_target.js"
import * as t_sealed_target_to_serialized_paragraph from "astn-runtime/modules/serialization/schemas/sealed_target/transformers/serialized_paragraph"

export namespace declarations {
    
    export type Document = p_.Transformer_With_Parameter<
        s_source.Document,
        s_target.Lines,
        s_parameters.Parameters
    >
    
    export type Root = p_.Transformer_With_Parameter<
        s_source.Root,
        s_target.Lines,
        s_parameters.Parameters
    >
    
    export type Element = p_.Transformer_With_Parameter<
        s_source.Element,
        s_target.Lines,
        s_parameters.Parameters
    >
    
    export type Mixed_Content = p_.Transformer_With_Parameter<
        s_source.Mixed_Content,
        s_target.Lines,
        s_parameters.Parameters
    >
    
    export type Node = p_.Transformer_With_Parameter<
        s_source.Node,
        s_target.Lines,
        s_parameters.Parameters
    >
    
    export type Qualified_Name = p_.Transformer_With_Parameter<
        s_source.Qualified_Name,
        s_target.Lines,
        s_parameters.Parameters
    >
}

// implementations

export const Document: declarations.Document = (
    $,
    $p,
) => t_sealed_target_to_serialized_paragraph.Document(
    t_to_sealed_target.Document(
        $,
    ),
    $p,
)

export const Root: declarations.Root = (
    $,
    $p,
) => t_sealed_target_to_serialized_paragraph.Document(
    t_to_sealed_target.Root(
        $,
    ),
    $p,
)

export const Element: declarations.Element = (
    $,
    $p,
) => t_sealed_target_to_serialized_paragraph.Document(
    t_to_sealed_target.Element(
        $,
    ),
    $p,
)

export const Mixed_Content: declarations.Mixed_Content = (
    $,
    $p,
) => t_sealed_target_to_serialized_paragraph.Document(
    t_to_sealed_target.Mixed_Content(
        $,
    ),
    $p,
)

export const Node: declarations.Node = (
    $,
    $p,
) => t_sealed_target_to_serialized_paragraph.Document(
    t_to_sealed_target.Node(
        $,
    ),
    $p,
)

export const Qualified_Name: declarations.Qualified_Name = (
    $,
    $p,
) => t_sealed_target_to_serialized_paragraph.Document(
    t_to_sealed_target.Qualified_Name(
        $,
    ),
    $p,
)
