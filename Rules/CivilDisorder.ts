import City from '@civ-clone/core-city/City';
import { IRuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import Rule from '@civ-clone/core-rule/Rule';
import Yield from '@civ-clone/core-yield/Yield';

type CivilDisorderArgs = [City, Yield[]?];

export class CivilDisorder extends Rule<CivilDisorderArgs, void> {}

export default CivilDisorder;

export interface ICivilDisorderRegistry
  extends IRuleRegistry<CivilDisorder, CivilDisorderArgs, void> {}
