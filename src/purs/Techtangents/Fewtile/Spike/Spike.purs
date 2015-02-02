module Techtangents.Fewtile.Spike.Spike where

import Network.Ajax
import qualified Control.Monad.JQuery as J
import Debug.Trace
import Data.Maybe
import Data.Either
import Control.Monad.Cont.Trans

main = do
  runContT getContinuation print

getContinuation = do
  let options = HttpRequest {accepts: Json, contentType: FormEncoded, method: GET, contents: Nothing}
  res <- ajaxCont "testdata/testdata.json" $ options
  handleContent res
  where
    handleContent (Left err) = return "some error"
    handleContent (Right text) = return text

data JenkinsColor =
      Blue
    | BlueAnime
    | Red
    | RedAnime
    | Yellow
    | YellowAnime
    | Aborted
    | AbortedAnime
    | Grey
    | GreyAnime
    | Disabled
    | DisabledAnime
    | NotBuilt
    | NotBuiltAnime


newtype JenkinsJob =
  JenkinsJob {
    name :: String,
    color :: JenkinsColor
  }

