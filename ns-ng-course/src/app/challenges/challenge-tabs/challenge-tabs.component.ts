import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular/router';
import { Page } from '@nativescript/core/ui/page/page';
import { ChallengeService } from '../challenge.service';

@Component({
  selector: 'ns-challenge-tabs',
  templateUrl: './challenge-tabs.component.html',
  styleUrls: ['./challenge-tabs.component.css'],
  moduleId: module.id
})
export class ChallengeTabsComponent implements OnInit {
  isLoading = false;

  constructor(
      private router: RouterExtensions,
      private active: ActivatedRoute,
      private page: Page,
      private challengeService: ChallengeService
    ) { }

    ngOnInit() {
        this.isLoading = true;
        this.challengeService.fetchCurrentChallenge().subscribe(
            res => {
                console.log('Fetched challenge...');
                this.isLoading = false;
                this.loadTabRoutes();
            },
            err => {
                console.log(err);
                this.isLoading = false;
                this.loadTabRoutes();
            }
        );

        this.page.actionBarHidden = true;
    }

    private loadTabRoutes() {
        setTimeout(() => {
            this.router.navigate(
                [
                    {
                        outlets: {
                            currentChallenge: ['current-challenge'],
                            today: ['today']
                        }
                    }
                ],
                {
                    relativeTo: this.active
                }
            );
        }, 10);
    }
}
