import * as p_ from 'pareto-core/transformer'

// schemas
import * as s_source from "../schema.js"
import * as s_target from "pareto-fountain-pen/modules/paragraph/schemas/serialized/schema"
import * as s_parameters from "pareto-fountain-pen/modules/paragraph/schemas/paragraph_serialization/schema"

// transformer dependencies
import * as t_to_sealed_target from "./astn_sealed_target.js"
import * as t_sealed_target_to_serialized_paragraph from "astn-runtime/modules/serialization/schemas/sealed_target/transformers/serialized_paragraph"

export namespace declarations {
    
    export type JSON_Value = p_.Transformer_With_Parameter<
        s_source.JSON_Value,
        s_target.Lines,
        s_parameters.Parameters
    >
    
    export type Value = p_.Transformer_With_Parameter<
        s_source.Value,
        s_target.Lines,
        s_parameters.Parameters
    >
    
    export type Definitions = p_.Transformer_With_Parameter<
        s_source.Definitions,
        s_target.Lines,
        s_parameters.Parameters
    >
    
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
}

// implementations

export const JSON_Value: declarations.JSON_Value = (
    $,
    $p,
) => t_sealed_target_to_serialized_paragraph.Document(
    t_to_sealed_target.JSON_Value(
        $,
    ),
    $p,
)

export const Value: declarations.Value = (
    $,
    $p,
) => t_sealed_target_to_serialized_paragraph.Document(
    t_to_sealed_target.Value(
        $,
    ),
    $p,
)

export const Definitions: declarations.Definitions = (
    $,
    $p,
) => t_sealed_target_to_serialized_paragraph.Document(
    t_to_sealed_target.Definitions(
        $,
    ),
    $p,
)

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
