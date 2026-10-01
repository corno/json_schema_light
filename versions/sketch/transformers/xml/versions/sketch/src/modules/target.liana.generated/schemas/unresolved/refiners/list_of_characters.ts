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
    
    export type Element = p_.Refiner_With_Parameter<
        s_target.Element,
        s_error.Error,
        s_source.List_Of_Characters,
        s_parameters.Parameters
    >
    
    export type Mixed_Content = p_.Refiner_With_Parameter<
        s_target.Mixed_Content,
        s_error.Error,
        s_source.List_Of_Characters,
        s_parameters.Parameters
    >
    
    export type Node = p_.Refiner_With_Parameter<
        s_target.Node,
        s_error.Error,
        s_source.List_Of_Characters,
        s_parameters.Parameters
    >
    
    export type Qualified_Name = p_.Refiner_With_Parameter<
        s_target.Qualified_Name,
        s_error.Error,
        s_source.List_Of_Characters,
        s_parameters.Parameters
    >
}

// implementations

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

export const Element: declarations.Element = (
    $,
    abort,
    $p,
) => r_from_parse_tree.Element(
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

export const Mixed_Content: declarations.Mixed_Content = (
    $,
    abort,
    $p,
) => r_from_parse_tree.Mixed_Content(
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

export const Node: declarations.Node = (
    $,
    abort,
    $p,
) => r_from_parse_tree.Node(
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

export const Qualified_Name: declarations.Qualified_Name = (
    $,
    abort,
    $p,
) => r_from_parse_tree.Qualified_Name(
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
