---
title: "[백준] 1931 : 회의실배정"
date: "2020-03-11"
layout: post
draft: false
path: "/posts/baekjoons/1931/"
category: "백준"
tags:
  - "백준"
  - "Algorithm"
description: "백준 1931번 문제 : 회의실배정"
---

# 1541번 : 잃어버린 괄호

👉 [문제 바로가기](https://www.acmicpc.net/problem/1931)



## 배경 지식
- `Greedy Algorithm` : 매 순간 최적의 선택으로 목표 단계까지 계산해 나가는 알고리즘

## 푼 방법
시작 시간과 끝나는 시간이 주어진 회의들 중, 하나의 회의실에서 최대 사용할 수 있는 회의 수를 구하는 문제이다.

초반에는 포커스를 **끝나는 시간 - 시작 시간**이 작은 회의들을 찾고 나열해가는 데 두었지만, 조금만 더 생각해보면 훨씬 쉽게 풀 수 있는 문제이다. **끝나는 시간을 기준으로 오름차순으로 정렬하고, 정렬된 첫 회의부터 마지막 회의까지 끝나는 시간이 제일 빠른 회의부터 세어 나가면 사용할 수 있는 최대 회의 수를 구할 수 있다.**

시간 차가 작은 것부터 세는 것이 아니라, 회의를 시간 순서에 맞게 나열해 놓고 문제에서 주어진 룰에 맞게 회의를 카운트 해나가야 한다.


## 내 정답 코드 (C++)

~~~c
#include <iostream>
#include <algorithm>
#include <utility>
#include <vector>

int main() {
	std::ios::sync_with_stdio(false);
	std::cin.tie(NULL); 
	std::cout.tie(NULL);
	
	typedef std::pair<int, int> duration;
	std::vector<duration> timetable;
	int n, tmp1, tmp2, result = 0, cur;
	
	std::cin >> n;
	
	for (int i = 0; i < n; ++i) {
		std::cin >> tmp1 >> tmp2;
		
		timetable.emplace_back(tmp2, tmp1); // 끝나는 시간을 먼저 집어 넣는다.
	}
	
	std::sort(timetable.begin(), timetable.end());
	
	for (int i = 0; i < n; ++i) {
		if (i == 0) {
			cur = timetable[i].first;
			++result;
		}
		else {
			if (cur <= timetable[i].second) { // 현재 회의의 끝나는 시간과 다음 회의의 시작 시간 비교 
				cur = timetable[i].first;
				++result;
			}
		}
	}
	
	std::cout << result << std::endl;
	
	return 0;
}
~~~
