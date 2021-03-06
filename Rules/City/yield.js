"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRules = void 0;
const CityGrowthRegistry_1 = require("@civ-clone/core-city-growth/CityGrowthRegistry");
const CityImprovementRegistry_1 = require("@civ-clone/core-city-improvement/CityImprovementRegistry");
const CivilDisorder_1 = require("@civ-clone/core-city-happiness/Rules/CivilDisorder");
const Priorities_1 = require("@civ-clone/core-rule/Priorities");
const PlayerResearchRegistry_1 = require("@civ-clone/core-science/PlayerResearchRegistry");
const Yields_1 = require("@civ-clone/civ1-world/Yields");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const Yield_1 = require("@civ-clone/core-city/Rules/Yield");
const Criterion_1 = require("@civ-clone/core-rule/Criterion");
const Effect_1 = require("@civ-clone/core-rule/Effect");
const Advances_1 = require("@civ-clone/civ1-science/Advances");
const CityImprovements_1 = require("@civ-clone/civ1-city-improvement/CityImprovements");
const Yields_2 = require("../../Yields");
const getRules = (ruleRegistry = RuleRegistry_1.instance, cityGrowthRegistry = CityGrowthRegistry_1.instance, cityImprovementRegistry = CityImprovementRegistry_1.instance, playerResearchRegistry = PlayerResearchRegistry_1.instance) => [
    new Yield_1.default(new Priorities_1.High(), new Criterion_1.default((cityYield) => cityYield instanceof Yields_2.Unhappiness), 
    // TODO: factor in difficulty levels
    new Effect_1.default((cityYield, city) => cityYield.add(Math.max(cityGrowthRegistry.getByCity(city).size() - 5, 0), 'population'))),
    new Yield_1.default(new Priorities_1.Low(), new Criterion_1.default((cityYield) => cityYield instanceof Yields_1.Production), new Criterion_1.default((cityYield, city, yields) => ruleRegistry
        .get(CivilDisorder_1.CivilDisorder)
        .some((rule) => rule.validate(city, yields))), new Effect_1.default((cityYield) => cityYield.set(0))),
    new Yield_1.default(new Priorities_1.Low(), new Criterion_1.default((cityYield) => cityYield instanceof Yields_1.Trade), new Criterion_1.default((cityYield, city, yields) => ruleRegistry
        .get(CivilDisorder_1.CivilDisorder)
        .some((rule) => rule.validate(city, yields))), new Effect_1.default((cityYield) => cityYield.set(0))),
    new Yield_1.default(new Priorities_1.Low(), new Criterion_1.default((cityYield) => cityYield instanceof Yields_2.Unhappiness), new Criterion_1.default((cityYield, city) => cityImprovementRegistry
        .getByCity(city)
        .some((cityImprovement) => cityImprovement instanceof CityImprovements_1.Temple)), new Criterion_1.default((cityYield, city) => !playerResearchRegistry.getByPlayer(city.player()).completed(Advances_1.Mysticism)), new Effect_1.default((cityYield) => cityYield.subtract(1, 'temple'))),
    new Yield_1.default(new Priorities_1.Low(), new Criterion_1.default((cityYield) => cityYield instanceof Yields_2.Unhappiness), new Criterion_1.default((cityYield, city) => cityImprovementRegistry
        .getByCity(city)
        .some((cityImprovement) => cityImprovement instanceof CityImprovements_1.Temple)), new Criterion_1.default((cityYield, city) => playerResearchRegistry.getByPlayer(city.player()).completed(Advances_1.Mysticism)), new Effect_1.default((cityYield) => cityYield.subtract(2, 'temple-mysticism'))),
];
exports.getRules = getRules;
exports.default = exports.getRules;
//# sourceMappingURL=yield.js.map