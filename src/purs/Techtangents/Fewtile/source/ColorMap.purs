module Techtangents.Fewtile.Source.ColorMap where

import Data.Map
import Data.Tuple.Nested
import Techtangents.Fewtile.Struct.Tile

colorMap :: Map String (String -> String -> Tile)
colorMap =
  fromList
    [ "blue"           /\ pass
    , "blue_anime"     /\ passBuilding
    , "red"            /\ fail
    , "red_anime"      /\ failBuilding
    , "yellow"         /\ fail
    , "yellow_anime"   /\ failBuilding
    , "aborted"        /\ fail
    , "aborted_anime"  /\ failBuilding
    , "grey"           /\ disabled
    , "grey_anime"     /\ disabledBuilding
    , "disabled"       /\ disabled
    , "disabled_anime" /\ disabledBuilding
    , "notbuilt"       /\ disabled
    , "notbuilt_anime" /\ disabledBuilding
    ]
