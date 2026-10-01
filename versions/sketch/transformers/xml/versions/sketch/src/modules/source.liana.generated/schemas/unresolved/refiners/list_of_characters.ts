import * as p_ from 'pareto-core/refiner'

// schemas
import * as s_target from "../schema.js"
import * as s_source from "astn-runtime/modules/deserialization/schemas/list_of_characters/schema"
import * as s_error from "liana-runtime/modules/unresolved_document_deserialization/schemas/unresolved_document_deserialization/schema"
import * as s_parameters from "liana-runtime/modules/unresolved_document_deserialization/schemas/unresolved_document_deserialization/schema"

// refiner dependencies
import * as r_from_parse_tree from "./astn_parse_tree.js"
import * as r_parse_tree_from_list_of_characters from "astn-runtime/modules/deserialization/schemas/parse_tree/refiners/list_of_characters"

export namespace declarations {
    
    export type JSON_Value = p_.Refiner_With_Parameter<
        s_target.JSON_Value,
        s_error.Error,
        s_source.List_Of_Characters,
        s_parameters.Parameters
    >
    
    export type Value = p_.Refiner_With_Parameter<
        s_target.Value,
        s_error.Error,
        s_source.List_Of_Characters,
        s_parameters.Parameters
    >
    
    export type Definitions = p_.Refiner_With_Parameter<
        s_target.Definitions,
        s_error.Error,
        s_source.List_Of_Characters,
        s_parameters.Parameters
    >
    
    export type Document = p_.Refiner_With_Parameter<
        s_target.Document,
        s_error.Error,
        s_source.List_Of_Characters,
        s_parameters.Parameters
    >
    
    export type Root = p_.Refiner_With_Parameter<
        s_target.Root,
        s_error.Error,
        s_source.List_Of_Characters,
        s_parameters.Parameters
    >
}

// implementations

export const JSON_Value: declarations.JSON_Value = (
    $,
    abort,
    $p,
) => r_from_parse_tree.JSON_Value(
    r_parse_tree_from_list_of_characters.Document(
        $,
        (
            $,
        ) => abort(['parse tree deserialization', $]),
        $p,
    )['content'],
    (
        $,
    ) => abort(['unmarshalling', $]),
)

export const Value: declarations.Value = (
    $,
    abort,
    $p,
) => r_from_parse_tree.Value(
    r_parse_tree_from_list_of_characters.Document(
        $,
        (
            $,
        ) => abort(['parse tree deserialization', $]),
        $p,
    )['content'],
    (
        $,
    ) => abort(['unmarshalling', $]),
)

export const Definitions: declarations.Definitions = (
    $,
    abort,
    $p,
) => r_from_parse_tree.Definitions(
    r_parse_tree_from_list_of_characters.Document(
        $,
        (
            $,
        ) => abort(['parse tree deserialization', $]),
        $p,
    )['content'],
    (
        $,
    ) => abort(['unmarshalling', $]),
)

export const Document: declarations.Document = (
    $,
    abort,
    $p,
) => r_from_parse_tree.Document(
    r_parse_tree_from_list_of_characters.Document(
        $,
        (
            $,
        ) => abort(['parse tree deserialization', $]),
        $p,
    )['content'],
    (
        $,
    ) => abort(['unmarshalling', $]),
)

export const Root: declarations.Root = (
    $,
    abort,
    $p,
) => r_from_parse_tree.Root(
    r_parse_tree_from_list_of_characters.Document(
        $,
        (
            $,
        ) => abort(['parse tree deserialization', $]),
        $p,
    )['content'],
    (
        $,
    ) => abort(['unmarshalling', $]),
)
