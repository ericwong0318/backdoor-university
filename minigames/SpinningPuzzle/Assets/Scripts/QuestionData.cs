using System.Collections.Generic;
using System.Linq;
using UnityEngine;

namespace Zkwokleung.MiniGames.SpinningPuzzles
{
    [CreateAssetMenu(fileName = "Set", menuName = "SpinningPuzzle/QuestionSet", order = 0)]
    public class QuestionData : ScriptableObject
    {
        public int Id;

        public List<Sprite> Sprites;

        public Sprite CompletePreview;

        public string GetCorrectOrder() => new string(Sprites.Select(s => s.name[s.name.Length - 1]).ToArray());
    }
}