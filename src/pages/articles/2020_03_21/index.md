---
title: "[백준] 9375 : 패션왕 신해빈"
date: "2020-03-21"
layout: post
draft: false
path: "/posts/baekjoons/9375/"
category: "백준"
tags:
  - "백준"
  - "Algorithm"
description: "백준 9375번 문제 : 패션왕 신해빈"
---

# 9375번 : 패션왕 신해빈

👉 [문제 바로가기](https://www.acmicpc.net/problem/9375)



## 배경 지식
- `이항 계수(Binomial coefficient)` : 주어진 크기 집합에서 원하는 개수만큼 **순서없이** 뽑는 조합의 가짓 수


## 푼 방법
이번 문제도 이항 계수 (조합) 관련 문제이다.

한 의상 종류에서 나오는 경우의 수는 **"각각의 의상을 선택할 경우 + 아무것도 선택하지 않을 경우"** 이다. 이렇게 경우의 수를 구할 수 있는 이유는 다음과 같은 조건들이 문제에서 주어졌기 때문이다.
1. 같은 종류의 의상은 하나만 입을 수 있다.
2. 같은 이름을 가진 의상은 존재하지 않는다.

**각각의 의상 종류에서 위와같이 경우의 수를 구하고, 서로 곱해준다.** 여기서 끝난걸까? 그렇지 않다. **구해진 전체 경우의 수에서 문제의 조건처럼 알몸인 경우(모든 의상 종류에서 의상을 선택하지 않을 경우)를 빼줘야 한다.**

---
<예제>  
- headgear x 2 => (headgear1을 선택할 경우 + headgear2를 선택할 경우) + 아무것도 선택 안할 경우 = 2 + 1 = 3가지  
- eyewear x 2 => (eyewear1을 선택할 경우 + eyewear2를 선택할 경우) + 아무것도 선택 안할 경우 = 2 + 1 = 3가지   
- face x 1 => (face1을 선택할 경우) + 아무것도 선택 안할 경우 = 1 + 1 = 2가지  
※ 의상 이름은 생략 (계산에 영향을 주지 않음)

=> **(2+1) x (2+1) x (1+1) - 1** = **3C1 x 3C1 x 2C1 - 1** = **18 - 1** = **17(가지의 경우의 수)**


## 내 정답 코드 (C++)
~~~c
#include <iostream>
#include <string>
#include <map>

int main() {
	std::ios::sync_with_stdio(false);
	std::cin.tie(NULL); 
	std::cout.tie(NULL);
	
	int n;
	
	std::cin >> n;
	
	for (int i = 0; i < n; ++i) {
		std::map<std::string, int> wear;
		int num_wear;
		
		std::cin >> num_wear;
		
		for(int j = 0; j < num_wear; ++j) {
			std::string wear_name, wear_type;
			
			std::cin >> wear_name >> wear_type;
			
			if (wear.find(wear_type) != wear.end()) // 의상 종류가 map에 존재한다면
				wear[wear_type] += 1;
			else // 의상 종류가 존재하지 않는다면
				wear[wear_type] = 1;
		}
		
		int result = 1;
		std::map<std::string, int>::iterator iter = wear.begin();
		
		for (; iter != wear.end(); ++iter)
			result *= (iter->second + 1); // 각각의 의상을 선택할 경우 + 아무것도 선택 안할 경우
		
		std::cout << result - 1 << '\n'; // 알몸(?)인 경우 빼기
	}
    
    return 0;
}
~~~
