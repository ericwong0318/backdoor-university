using System.Collections;
using System.Collections.Generic;
using System.Linq;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace Zkwokleung.MiniGames.SpinningPuzzles
{
    public enum ControlPositionEnum { TopLeft, TopRight, BottomLeft, BottomRight }
    public enum SpinDirectionEnum { Clockwise, CounterClockwise }
    public class GameManager : MonoBehaviour
    {
        public static GameManager Instance { get; private set; }

        #region Inspectors
        [Header("Components")]
        [SerializeField] private List<ImageTile> Tiles;
        [SerializeField] private List<GameObject> Indicators;
        [SerializeField] private Image Preview;
        [SerializeField] private TextMeshProUGUI TimerText;
        [SerializeField] private GameObject CompleteText;
        [SerializeField] private GameObject BtnChangeDir;
        public QuestionData CurrentQuestion;
        [Header("Settings")]
        [SerializeField] private List<QuestionData> questions;
        #endregion

        #region Public Properties
        public float TimerValue { get; private set; }
        public SpinDirectionEnum Direction = SpinDirectionEnum.Clockwise;
        #endregion

        #region Private Fields
        private Coroutine m_timerCoroutine;
        private bool m_isGameOver = false;
        #endregion

        #region MonoBehaviour
        private void Awake()
        {
            // Singleton
            if (Instance != null)
            {
                Destroy(gameObject);
                return;
            }
            else
            {
                Instance = this;
            }

            m_timerCoroutine = null;
            CompleteText.SetActive(false);
        }

        private void Start()
        {
            StartNewGame();
        }
        #endregion

        #region Logic Functions
        public void StartNewGame()
        {
            CurrentQuestion = questions[Random.Range(0, questions.Count)];
            // Load Question
            Preview.sprite = CurrentQuestion.CompletePreview;
            for (int i = 0; i < 9; i++)
            {
                SetImage(i, i);
            }
            Shuffle();
            ResetTimer();
            StartTimer();
            CompleteText.SetActive(false);
            m_isGameOver = false;
            SetAllIndicatorOff();
        }

        public string GetCurrentOrder() => new string(Tiles.Select(t => t.ImageIndex.ToString()[0]).ToArray());
        public bool IsCorrect() => GetCurrentOrder().Equals(CurrentQuestion.GetCorrectOrder());

        public void SetImage(int itIdx, int imgIdx)
        {
            Tiles[itIdx].Sprite = CurrentQuestion.Sprites[imgIdx];
            Tiles[itIdx].ImageIndex = imgIdx;
        }

        public void Spin(ControlPositionEnum pos, SpinDirectionEnum dir)
        {
            if (m_isGameOver)
                return;

            switch (pos)
            {
                case ControlPositionEnum.TopLeft:
                    Spin(0, 1, 3, 4, dir);
                    break;

                case ControlPositionEnum.TopRight:
                    Spin(1, 2, 4, 5, dir);
                    break;

                case ControlPositionEnum.BottomLeft:
                    Spin(3, 4, 6, 7, dir);
                    break;

                case ControlPositionEnum.BottomRight:
                    Spin(4, 5, 7, 8, dir);
                    break;
            }
        }

        private void Spin(int topLeft, int topRight, int bottomLeft, int bottomRight, SpinDirectionEnum dir)
        {
            if (m_isGameOver)
                return;

            if (dir == SpinDirectionEnum.Clockwise)
            {
                int tmp = Tiles[topLeft].ImageIndex;
                SetImage(topLeft, Tiles[bottomLeft].ImageIndex);
                SetImage(bottomLeft, Tiles[bottomRight].ImageIndex);
                SetImage(bottomRight, Tiles[topRight].ImageIndex);
                SetImage(topRight, tmp);
            }
            else
            {
                int tmp = Tiles[topLeft].ImageIndex;
                SetImage(topLeft, Tiles[topRight].ImageIndex);
                SetImage(topRight, Tiles[bottomRight].ImageIndex);
                SetImage(bottomRight, Tiles[bottomLeft].ImageIndex);
                SetImage(bottomLeft, tmp);
            }

            if (IsCorrect())
            {
                GameOver();
            }
        }

        public void Shuffle()
        {
            // Shuffle the list of index and apply the index to the image
            System.Random rng = new System.Random();
            List<int> idx = new List<int>() { 0, 1, 2, 3, 4, 5, 6, 7, 8 };
            int n = idx.Count;
            while (n > 1)
            {
                n--;
                int k = rng.Next(n + 1);
                int value = idx[k];
                idx[k] = idx[n];
                idx[n] = value;
            }
            for (int i = 0; i < 9; i++)
            {
                SetImage(i, idx[i]);
            }
        }

        public void StartTimer()
        {
            StopTimer();
            m_timerCoroutine = StartCoroutine(IEStartTimer());
        }

        public void StopTimer()
        {
            if (m_timerCoroutine != null)
            {
                StopCoroutine(m_timerCoroutine);
            }
        }

        public void ResetTimer()
        {
            TimerValue = 0;
        }

        private IEnumerator IEStartTimer()
        {
            while (true)
            {
                yield return new WaitForSeconds(.1f);
                TimerValue += .1f;
                TimerText.text = $"Time: {((int)TimerValue).ToString()}";
            }
        }

        private void GameOver()
        {
            m_isGameOver = true;
            CompleteText.SetActive(true);
            SetAllIndicatorOff();
            StopTimer();
        }
        #endregion

        #region Graphic Control
        public void SetIndicatorOn(ControlPositionEnum pos)
        {
            if (m_isGameOver)
                return;

            SetAllIndicatorOff(except: pos);
            Indicators[(int)pos].SetActive(true);
        }

        public void SetIndicatorOff(ControlPositionEnum pos)
        {
            Indicators[(int)pos].SetActive(false);
        }

        public void SetAllIndicatorOff(ControlPositionEnum? except = null)
        {
            for (int i = 0; i < 4; i++)
            {
                if (except != null && i == ((int)except))
                {
                    continue;
                }

                Indicators[i].SetActive(false);
            }
        }
        #endregion

        #region Button On Clicks
        public void OnButtonRestartClicked()
        {
            StartNewGame();
        }

        public void OnBtnChangeDirClicked()
        {
            Direction = (SpinDirectionEnum)(1 - ((int)Direction));
            BtnChangeDir.transform.localScale = new Vector3(BtnChangeDir.transform.localScale.x * -1, 1, 1);
        }
        #endregion
    }
}