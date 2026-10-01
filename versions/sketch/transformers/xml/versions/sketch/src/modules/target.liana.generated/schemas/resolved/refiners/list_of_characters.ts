import * as p_ from 'pareto-core/refiner'

// schemas
import * as s_target from "../schema.js"
import * as s_source from "astn-runtime/modules/deserialization/schemas/list_of_characters/schema"
import * as s_error from "liana-runtime/modules/resolved_document_deserialization/schemas/resolved_document_deserialization/schema"
import * as s_parameters from "liana-runtime/modules/resolved_document_deserialization/schemas/resolved_document_deserialization/schema"

// refiner dependencies
import * as r_from_unresolved from "./unresolved.js"
import * as r_unresolved_from_list_of_characters from "../../unresolved/refiners/list_of_characters.js"

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
) => r_from_unresolved.Document(
    r_unresolved_from_list_of_characters.Document(
        $,
        (
            $,
        ) => abort(['unresolved document deserialization', $]),
        $p,
    ),
    (
        $,
    ) => abort(['resolving', $]),
)

export const Root: declarations.Root = (
    $,
    abort,
    $p,
) => r_from_unresolved.Root(
    r_unresolved_from_list_of_characters.Root(
        $,
        (
            $,
        ) => abort(['unresolved document deserialization', $]),
        $p,
    ),
    (
        $,
    ) => abort(['resolving', $]),
)

export const Element: declarations.Element = (
    $,
    abort,
    $p,
) => r_from_unresolved.Element(
    r_unresolved_from_list_of_characters.Element(
        $,
        (
            $,
        ) => abort(['unresolved document deserialization', $]),
        $p,
    ),
    (
        $,
    ) => abort(['resolving', $]),
)

export const Mixed_Content: declarations.Mixed_Content = (
    $,
    abort,
    $p,
) => r_from_unresolved.Mixed_Content(
    r_unresolved_from_list_of_characters.Mixed_Content(
        $,
        (
            $,
        ) => abort(['unresolved document deserialization', $]),
        $p,
    ),
    (
        $,
    ) => abort(['resolving', $]),
)

export const Node: declarations.Node = (
    $,
    abort,
    $p,
) => r_from_unresolved.Node(
    r_unresolved_from_list_of_characters.Node(
        $,
        (
            $,
        ) => abort(['unresolved document deserialization', $]),
        $p,
    ),
    (
        $,
    ) => abort(['resolving', $]),
)

export const Qualified_Name: declarations.Qualified_Name = (
    $,
    abort,
    $p,
) => r_from_unresolved.Qualified_Name(
    r_unresolved_from_list_of_characters.Qualified_Name(
        $,
        (
            $,
        ) => abort(['unresolved document deserialization', $]),
        $p,
    ),
    (
        $,
    ) => abort(['resolving', $]),
)
