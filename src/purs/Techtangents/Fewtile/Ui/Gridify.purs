module Techtangents.Fewtile.Ui.Gridify where

import Data.Foldable (foldlArray)
import Math(round, sqrt, min, max, floor)

import Data.Foldable (sum)

bound :: Number -> Number -> Number -> Number
bound l u x = min u (max l x)

newtype RowSpec = RowSpec
  { rows :: Number
  , cols :: Number
  , cells :: Number
  , width :: Number
  , height :: Number
  , ar :: Number
  }

newtype GridSpec = GridSpec
  { rows :: Number
  , cells :: Number
  , meanAr :: Number
  , rowSpecs :: [RowSpec]
  }

gridify :: Number -> Number -> Number -> Number -> GridSpec
gridify aspectRatio totalWidth totalHeight numCells =
  let
    rows = bound 1 numCells (round (sqrt ((aspectRatio * totalHeight * numCells) / totalWidth)))

    normalCols = floor (numCells / rows)
    skinnyCols = normalCols + 1

    skinnyRows = numCells % rows
    normalRows = rows - skinnyRows

    height = totalHeight / rows

    f r c =
      let
        cells = r * c
        width = totalWidth / c
        ar = width / height
      in
        RowSpec
          { rows: r
          , cols: c
          , cells: cells
          , width: width
          , height: height
          , ar: ar
          }

    normal = f normalRows normalCols
    rowSpecs = if skinnyRows == 0
                   then [normal]
                   else [normal, f skinnyRows skinnyCols]

    sumArs = sum $ (\(RowSpec r) -> r.ar * r.cells) <$> rowSpecs

    meanAr = sumArs / numCells

  in
    GridSpec
      { rows: rows
      , cells: numCells
      , rowSpecs: rowSpecs
      , meanAr: meanAr
      }
