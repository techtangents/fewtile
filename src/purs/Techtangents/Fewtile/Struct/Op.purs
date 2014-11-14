module Techtangents.Fewtile.Struct.Op where

import Data.Maybe

data Op k v = Add k v | Remove k v | Change k v v

key :: forall k v. Op k v -> k
key (Add k _) = k
key (Remove k _) = k
key (Change k _ _) = k

old :: forall k v. Op k v -> Maybe v
old (Add _ _) = Nothing
old (Remove _ v) = Just v
old (Change k _ v) = Just v

nu :: forall k v. Op k v -> Maybe v
nu (Add _ v) = Just v
nu (Remove _ _) = Nothing
nu (Change k v _) = Just v
