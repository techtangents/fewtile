module Techtangents.Fewtile.Ui.Gridify where

import Math(round, sqrt, min, max, floor)

import Data.Foldable (foldlArray)

sum :: [Number] -> Number
sum = foldlArray (+) 0

bound :: Number -> Number -> Number -> Number
bound l u x = min u (max l x)

type RowLayout = {rows :: Number, cols :: Number, cells :: Number, width :: Number, height :: Number, ar :: Number}

type GridLayout = {rows :: Number, cells :: Number, rowLayouts :: [RowLayout], meanAr :: Number}

gridify :: Number -> Number -> Number -> Number -> GridLayout
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
        { rows: r
        , cols: c
        , cells: cells
        , width: width
        , height: height
        , ar: ar
        }

    normal = f normalRows normalCols
    rowLayouts = if skinnyRows == 0
                   then [normal]
                   else [normal, f skinnyRows skinnyCols]

    sumArs = sum $ (\r -> r.ar * r.cells) <$> rowLayouts

    meanAr = sumArs / numCells

  in
    { rows: rows
    , cells: numCells
    , rowLayouts: rowLayouts
    , meanAr: meanAr
    }
