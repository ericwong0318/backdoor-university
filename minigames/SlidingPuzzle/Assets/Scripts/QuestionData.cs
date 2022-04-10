using System.Collections.Generic;
using UnityEngine;

namespace Zkwokleung.Minigames.SlidingPuzzles
{
    [CreateAssetMenu(fileName = "Set", menuName = "SlidingPuzzle/QuestionData", order = 0)]
    public class QuestionData : ScriptableObject
    {
        public List<Sprite> Images;
        public Sprite CompleteImage;
    }
}